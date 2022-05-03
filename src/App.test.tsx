import React from "react";
import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import App from './App';
import expect from 'expect'
import userEvent from "@testing-library/user-event";


it('should render correct', () => {
      // render your component
      render(<App />) 

    const loadMore = screen.getAllByText("Load more...");
    expect(loadMore).toBeTruthy();

    const btnWorst = screen.getAllByText("Worst Reviews");
    expect(btnWorst).toBeTruthy();

    const btnBest = screen.getAllByText("Best Reviews");
    expect(btnBest).toBeTruthy();

    const btnAll = screen.getAllByText("All Advisors");
    expect(btnAll).toBeTruthy();

    const loading = screen.getByText("Loading...");
    expect(loading).toBeTruthy();
     
   });





