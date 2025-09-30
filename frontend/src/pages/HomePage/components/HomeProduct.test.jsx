import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import HomeProduct from "./HomeProduct";
import { expect, it, describe, vi } from "vitest";
vi.mock("axios");

describe("HomeProduct component", () => {
  it("Displays product details correctly", () => {
    const mockProduct = {
      keywords: ["socks", "sports", "apparel"],
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
    };
    const loadCartMock = vi.fn();
    render(<HomeProduct product={mockProduct} loadCart={loadCartMock} />);
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
    expect(screen.getByText("87")).toBeInTheDocument();
    expect(
      screen.getByAltText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );
    expect(screen.getByAltText("reviews")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png"
    );
    expect(screen.getByText("$10.90")).toBeInTheDocument();
    expect(screen.getByAltText("Added to cart checkmark")).toBeInTheDocument();
  });
  describe("Add to Cart button", () => {
    it("adds product to the cart", async () => {
      const mockProduct = {
        keywords: ["socks", "sports", "apparel"],
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87,
        },
        priceCents: 1090,
      };
      const loadCartMock = vi.fn().mockResolvedValue(undefined);
      vi.spyOn(axios, "post").mockResolvedValue({ data: {} });
      render(<HomeProduct product={mockProduct} loadCart={loadCartMock} />);
      const user = userEvent.setup();
      const addToCartButton = screen.getByRole("button", {
        name: /add to cart/i,
      });
      await user.click(addToCartButton);
      const addedDiv = screen.getByTestId("added-message");
      expect(addedDiv).toHaveClass("visible");
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
      });
      expect(loadCartMock).toHaveBeenCalledTimes(1);
      const select = screen.getByRole("combobox");
      await user.selectOptions(select, "3");
      await user.click(addToCartButton);
      expect(axios.post).toHaveBeenCalledTimes(2);
      expect(axios.post).toHaveBeenLastCalledWith("/api/cart-items", {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 3,
      });
      expect(loadCartMock).toHaveBeenCalledTimes(2);
    });
  });
});
