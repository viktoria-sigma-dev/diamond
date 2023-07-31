### Project description:
Project gives a possibility to a user to calculate a diamond price based on Carat Weight, Cut, Color and Clarity, Make abd Certificate.
The project contains a form with autocomplete and number values (considering factor type), actual price data on the current moment and a modal window,
that allows to check out similar diamonds based on the calculated price and chosen cut.

Project utilizes API endpoints. So to be able to use the whole functionality of the project - please set up env file.

### Dependencies
1. BE up and running with exposed `/diamond/calculate` and `/diamond/get-similar-products` endpoints.

### Project data:
Project utilizes defined input parameters from third-party `http://api.idexonline.com/RealTimePrices/Calculator`.
1. You can find/edit all the characteristics reflected in the form using path:
   `src/constants/diamond-characteristics.ts`

### Project set up assumptions:
1. Theme was created for the whole project with defined values here `src/constants/theme.ts`
2. Design was created using on the MUI `https://mui.com/`
3. Typescript was used by default
4. Redux store was added to the project

### Project behavior assumptions:
1. Required diamond characteristics to calculate price were provided: Carat Weight, Cut, Color and Clarity.
2. Optional diamond characteristics to calculate price were added: Make abd Certificate.
3. BE uses third party API in order to calculate diamond price:
`http://www.idexonline.com/DPService.asp`, but also there is a possibility to pass "useOfflineCalculator=true" flag and diamond price will be calculated by system.
4. Since price currency is not returned from third party API, default currency is used: "USD".
5. Characteristics options were taken from the source (Input parameters):
`http://www.idexonline.com/DPService.asp`
6. Similar products are loaded after diamond cut and calculated price is defined.


### Run project
1. Run `yarn install` to install dependencies
2. Copy/paste `.env.example` and rename to `.env` in order to have environment variables during project running. Update variables in case of need.
3. In the project directory, you can run:
`yarn start`
