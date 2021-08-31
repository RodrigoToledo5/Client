// testing
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Carousel  from "./Carousel.js";


describe('when Carousel render', () => {
  it('Carousel render', () => {
    const gc = render(
      <BrowserRouter>
        <Carousel />
      </BrowserRouter>
    );
    const item = document.querySelector(".CarouselItem");
    expect(item).toBeTruthy();
    
  })
});