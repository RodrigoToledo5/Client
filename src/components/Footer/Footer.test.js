import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Footer from './Footer';

test('render footer', ()=>{
    const component = render(<Footer/>)
    const contact= component.getByText("Contact")
    expect(contact).toBeDefined();
    const support= component.getByText("Support")
    expect(support).toBeDefined();
    const privacy= component.getByText("Privacy")
    expect(privacy).toBeDefined();
    const login= component.getByText("Login")
    expect(login).toBeDefined();
    const register= component.getByText("Register")
    expect(register).toBeDefined();
    const backup= component.getByText("Backup")
    expect(backup).toBeDefined();
    const history= component.getByText("History")
    expect(history).toBeDefined();
    const roll= component.getByText("Roll")
    expect(roll).toBeDefined();
})
