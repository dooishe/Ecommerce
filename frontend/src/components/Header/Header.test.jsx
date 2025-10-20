import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { expect, it, describe, beforeEach } from "vitest";
import Header from "./Header";

describe("Header component", () => {
  let cartProductsMock;
  beforeEach(() => {
    cartProductsMock = [
      {
        id: 1,
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 42,
        deliveryOptionId: "1",
        createdAt: "2025-09-23T13:32:21.787Z",
        updatedAt: "2025-10-11T03:30:05.769Z",
      },
      {
        id: 14,
        productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity: 2,
        deliveryOptionId: "1",
        createdAt: "2025-09-30T10:28:23.587Z",
        updatedAt: "2025-10-16T17:21:33.129Z",
      },
    ];
  });
  it("displays the Header correct", () => {
    render(
      <MemoryRouter>
        <Header cartProducts={cartProductsMock} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("logo")).toHaveAttribute(
      "src",
      "/src/assets/logos/logo-white.png"
    );
    expect(screen.getByTestId("mobile-logo")).toHaveAttribute(
      "src",
      "/src/assets/logos/mobile-logo-white.png"
    );
    expect(screen.getByTestId("search-icon")).toHaveAttribute(
      "src",
      "/src/assets/icons/search-icon.png"
    );
    expect(screen.getByTestId("cart-icon")).toHaveAttribute(
      "src",
      "/src/assets/icons/cart-icon.png"
    );
  });
  it("calculateCartQuantity return right values", () => {
    const { rerender } = render(
      <MemoryRouter>
        <Header cartProducts={cartProductsMock} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("cart-quantity")).toHaveTextContent(44);
    cartProductsMock = null;
    rerender(
      <MemoryRouter>
        <Header cartProducts={cartProductsMock} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("cart-quantity")).toHaveTextContent(0);
    cartProductsMock = undefined;
    rerender(
      <MemoryRouter>
        <Header cartProducts={cartProductsMock} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("cart-quantity")).toHaveTextContent(0);
    cartProductsMock = [];
    rerender(
      <MemoryRouter>
        <Header cartProducts={cartProductsMock} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("cart-quantity")).toHaveTextContent(0);
  });
  it("Navlinks have correct href attribute", () => {
    render(
      <MemoryRouter>
        <Header cartProducts={cartProductsMock} />
      </MemoryRouter>
    );
    const headerLink = screen.getByRole("link", { name: /home link/i });
    expect(headerLink).toHaveAttribute("href", "/");
    const orderLink = screen.getByRole("link", { name: /orders link/i });
    expect(orderLink).toHaveAttribute("href", "/orders");
    const cartLink = screen.getByRole("link", { name: /cart link/i });
    expect(cartLink).toHaveAttribute("href", "/checkout");
  });
  it("when it is OrderPage order link is active", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/"],
    });
    const { rerender } = render(
      <Router location={history.location} navigator={history}>
        <Header cartProducts={cartProductsMock} />
      </Router>
    );
    let orderLink = await screen.findByRole("link", { name: /orders link/i });
    expect(orderLink).not.toHaveClass("active-link");
    history.push("/orders");
    rerender(
      <Router location={history.location} navigator={history}>
        <Header cartProducts={cartProductsMock} />
      </Router>
    );
    orderLink = await screen.findByRole("link", { name: /orders link/i });
    expect(orderLink).toHaveClass("active-link");
  });
  it("input tracks text updates using the updateSearch function");
});
