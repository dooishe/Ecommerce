import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { expect, it, describe, vi, beforeEach } from "vitest";
import axios from "axios";
import PaymentSummary from "./PaymentSummary";
import { convertCentsToDollars } from "@/utils/money";
vi.mock("axios");
describe("PaymentSummary component", () => {
  let paymentSummaryMock;
  let loadCartMock;
  let cartProductsMock;
  let user = userEvent.setup();
  beforeEach(() => {
    paymentSummaryMock = {
      totalItems: 64,
      productCostCents: 89264,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 89763,
      taxCents: 8976,
      totalCostCents: 98739,
    };
    loadCartMock = vi.fn().mockResolvedValue(undefined);
    cartProductsMock = [
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
    ];
    user = userEvent;
  });
  it("renders paymentSummary details correctly", () => {
    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route
            path="/checkout"
            element={
              <PaymentSummary
                paymentSummary={paymentSummaryMock}
                loadCart={loadCartMock}
                cartProducts={cartProductsMock}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("Items (64):", {
      exact: true,
    });
    expect(screen.getByTestId("product-cost")).toHaveTextContent(
      `$${convertCentsToDollars(89264)}`,
      {
        exact: true,
      }
    );
    expect(screen.getByTestId("shipping-cost")).toHaveTextContent(
      `$${convertCentsToDollars(499)}`,
      {
        exact: true,
      }
    );
    expect(screen.getByTestId("total-cost-before-tax")).toHaveTextContent(
      `$${convertCentsToDollars(89763)}`,
      {
        exact: true,
      }
    );
    expect(screen.getByTestId("tax")).toHaveTextContent(
      `$${convertCentsToDollars(8976)}`,
      {
        exact: true,
      }
    );
    expect(screen.getByTestId("total-cost")).toHaveTextContent(
      `$${convertCentsToDollars(98739)}`,
      {
        exact: true,
      }
    );
  });
  it("Create order button adds order", async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }
    vi.spyOn(axios, "post").mockResolvedValue(undefined);
    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route
            path="/checkout"
            element={
              <PaymentSummary
                paymentSummary={paymentSummaryMock}
                loadCart={loadCartMock}
                cartProducts={cartProductsMock}
              />
            }
          />
          <Route path="/orders" element={<Location />} />
        </Routes>
      </MemoryRouter>
    );
    const createOrderButton = screen.getByRole("button", {
      name: /place your order/i,
    });
    await user.click(createOrderButton);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCartMock).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("url-path")).toHaveTextContent("/orders");
  });

  it("if cartProducts empty array create order button can not adds order", async () => {
    cartProductsMock = [];
    vi.spyOn(axios, "post");
    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route
            path="/checkout"
            element={
              <PaymentSummary
                paymentSummary={paymentSummaryMock}
                loadCart={loadCartMock}
                cartProducts={cartProductsMock}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const createOrderButton = screen.getByRole("button", {
      name: /place your order/i,
    });
    await user.click(createOrderButton);
    expect(axios.post).toHaveBeenCalledTimes(0);
    expect(loadCartMock).toHaveBeenCalledTimes(0);
  });
});
