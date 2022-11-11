/**
 * @vitest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import createFetchMock from 'vitest-fetch-mock';


const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();




beforeEach(() => {
  fetchMock.doMock()
  vi.spyOn(global, 'fetch')
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
vi.clearAllMocks();
fetchMock.mockClear();
})



test('displays the pokemon', async () => {
    render(<App />)
    const input = screen.getByTestId(/input/i)
    const submit = screen.getByTestId(/submit/i)
    
    // verify displaying pokemon on successful request 
    await userEvent.clear(input);
    await userEvent.type(input, 'pikachu')
    await userEvent.click(submit)
    await screen.findAllByRole('heading', {name:/pikachu/i});
    
    
    // verify that a request is not made when input is the same
    fetchMock.mockClear();
    await userEvent.click(submit)
    await screen.findAllByRole('heading', {name:/pikachu/i});
    expect(fetch).not.toHaveBeenCalled()

    // verify error handling
    await userEvent.clear(input)
    await userEvent.type(input, 'digimon')
    await userEvent.click(submit)
    expect(await screen.findByRole('alert')).toHaveTextContent(/There was an error.*Unsupported pokemon.*digimon/,)
    expect(console.error).toHaveBeenCalled()

})

