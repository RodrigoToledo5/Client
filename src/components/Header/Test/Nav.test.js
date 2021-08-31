import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Nav from '../nav';

test('render nav', ()=>{
    const component = render(<Nav/>)
    const home= component.getByText("HOME")
    expect(home).toBeDefined();
    const tittle= component.getByText("Consultance Space")
    expect(tittle).toBeDefined();
    const sign= component.getByText("Sign-In")
    expect(sign).toBeDefined();
    const login= component.getByText("Login")
    expect(login).toBeDefined();
})
