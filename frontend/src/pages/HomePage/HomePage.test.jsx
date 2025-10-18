import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import axios from "axios";
import HomePage from "./HomePage";
import { expect, it, describe, vi, beforeEach } from "vitest";
vi.mock("axios");

describe("HomePage component (unit/integration)", () => {
  let cartProductsMock;
  let loadCartMock;
  beforeEach(() => {
    vi.clearAllMocks();
    cartProductsMock = [];
    loadCartMock = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(axios, "post").mockImplementation((urlPath, productInfo) => {
      cartProductsMock.push({ quantity: productInfo.quantity });
      return { data: {} };
    });
    vi.spyOn(axios, "get").mockImplementation((urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              keywords: ["socks", "sports", "apparel"],
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              createdAt: "2025-09-19T20:22:54.889Z",
              updatedAt: "2025-09-19T20:22:54.889Z",
            },
            {
              keywords: ["sports", "basketballs"],
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              createdAt: "2025-09-19T20:22:54.890Z",
              updatedAt: "2025-09-19T20:22:54.890Z",
            },
          ],
        };
      } else if (urlPath === "/api/products?search=socks") {
        return {
          data: [
            {
              keywords: ["socks", "sports", "apparel"],
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              createdAt: "2025-09-19T20:22:54.889Z",
              updatedAt: "2025-09-19T20:22:54.889Z",
            },
          ],
        };
      }
    });
  });
  it("render the products correctly with search_query", async () => {
    render(
      <MemoryRouter initialEntries={["/?search_query=socks"]}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cartProducts={cartProductsMock}
                loadCart={loadCartMock}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const productElements = await screen.findAllByTestId("product-container");
    expect(productElements.length).toBe(1);
    expect(
      within(productElements[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      )
    ).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/products?search=socks");
  });
  it("render the products correctly with no search_query", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cartProducts={cartProductsMock}
                loadCart={loadCartMock}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const productElements = await screen.findAllByTestId("product-container");
    expect(productElements.length).toBe(2);
    expect(
      within(productElements[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      )
    ).toBeInTheDocument();
    expect(
      within(productElements[1]).getByText("Intermediate Size Basketball")
    ).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/products");
  });
  describe("integration test HomeProduct + Header", () => {
    it("in HomeProduct 'add product button' updates cartProducts quantity in the Header", async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  cartProducts={cartProductsMock}
                  loadCart={loadCartMock}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      );
      const productElements = await screen.findAllByTestId("product-container");
      const addToCartButton = within(productElements[0]).getByRole("button", {
        name: /add to cart/i,
      });
      const select = within(productElements[0]).getByRole("combobox");
      expect(await screen.findByTestId("cart-quantity")).toHaveTextContent(0);
      const user = userEvent.setup();
      await user.selectOptions(select, "3");
      await user.click(addToCartButton);
      expect(axios.post).toHaveBeenCalledOnce();
      expect(loadCartMock).toHaveBeenCalledOnce();
      rerender(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  cartProducts={cartProductsMock}
                  loadCart={loadCartMock}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      );
      expect(await screen.findByTestId("cart-quantity")).toHaveTextContent(3);
    });
  });
});
