// testing
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import CallToAction  from "./CallToAction.js";

const titleName = "Somos ConsultanceSpace!";

describe('when CallToAction render', () => {

  it('CallToAction render title', () => {
    const gc = render(
      <BrowserRouter>
        <CallToAction />
      </BrowserRouter>
    );
    gc.getByText(titleName);
  })
  it('CallToAction render button', () => {
    const gc = render(
      <BrowserRouter>
        <CallToAction />
      </BrowserRouter>
    );
    const button = document.querySelector("button");
    expect(button).toBeTruthy();
  })
  xit('test button click link', () => { // Todo when register.js
  })

});