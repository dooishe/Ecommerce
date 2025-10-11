import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import HomePage from "./HomePage";
import HomeProduct from "./components/HomeProduct";
import { expect, it, describe, vi, beforeEach } from "vitest";
vi.mock("axios");

describe("HomePage component", () => {
  let cartProductsMock;
  let loadCartMock;
  beforeEach(() => {
    cartProductsMock = [];
    loadCartMock = vi.fn().mockResolvedValue(undefined);
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
      } else if (urlPath === "/api/products?search_query=socks") {
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
    await waitFor(() => {
      expect(
        screen.findByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
      ).toBeInTheDocument();
    });
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
  });
});
