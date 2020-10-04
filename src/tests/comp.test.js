import React from 'react'
import {render,unmountComponentAtNode} from 'react-dom'
import {act} from 'react-dom/test-utils'
import Header from '../header'


let container = null;
beforeEach(()=>{
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(()=>{
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders with or without name",()=>{
    act(()=>{
        render(<Header/>,container);
    });
    expect(container.textContent).toBe("Hello World");

    jest.spyOn();
});









