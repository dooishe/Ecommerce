import { render, screen } from "@testing-library/react";
import HomeProduct from "./HomeProduct";
import { expect, it, describe, vi } from "vitest";

describe("HomeProduct component", () => {
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
  it("Displays product details correctly", () => {
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
});
