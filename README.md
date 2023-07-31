### Project description:
Project gives a possibility to a user to calculate a diamond price based on Carat Weight, Cut, Color and Clarity, Make and Certificate.
The project contains a form with autocomplete and number values (considering factor type), actual price data on the current moment and a modal window,
that allows to check out similar diamonds based on the calculated price and chosen cut.

Back-end contains two exposed API endpoints:
1. `/diamond/calculate` that allows to calculate diamond price with real-time data or offline
2. `/diamond/get-similar-products` that allows to get up to 4 similar products.

### Dependencies
1. FE up and running
2. BE up and running with exposed `/diamond/calculate` and `/diamond/get-similar-products` endpoints.
3. Third-party API endpoint to calculate diamond price `http://www.idexonline.com/DPService.asp`
4. Third-party API endpoint to fetch similar diamonds `https://www.diamonds.pro/goodai-dist/goodai/server/api-staging.php`

### Project data:
Project utilizes defined input parameters from third-party `http://api.idexonline.com/RealTimePrices/Calculator`.
1. You can find/edit all the characteristics (factors) reflected in the form using path:
   `diamond-analyser-fe/src/constants/diamond-characteristics.ts`
2. You can find mocked data to calculate diamond price offline using this path:
   `diamond-analyser-be/src/diamond/constants/diamondPriceFactors.ts`

### Front-end set up assumptions:
1. Theme was created for the whole project with defined values here `src/constants/theme.ts`
2. Design was created using on the MUI `https://mui.com/`
3. Typescript was used by default
4. Redux store was added to the project

### Back-end set up assumptions:
1. Nest.js is used for the project architecture
2. Typescript is used by default
3. Cache manager is used to cache data by default for 15 minutes
4. Basic unit tests were added
5. Error, warn, info logs were added to the terminal

### Project behavior assumptions:
1. Required diamond characteristics to calculate price were provided: Carat Weight, Cut, Color and Clarity.
2. Optional diamond characteristics to calculate price were added: Make abd Certificate.
3. BE uses third party API in order to calculate diamond price:
`http://www.idexonline.com/DPService.asp`, but also there is a possibility to pass "useOfflineCalculator=true" flag and diamond price will be calculated by the system.
*FYI: price formula was built based on mock values and do not reflect the real diamond price.
4. Since price currency is not returned from the third party API, default currency is used: "USD".
5. Characteristics options were taken from the source (Input parameters):
`http://www.idexonline.com/DPService.asp`
6. Similar products can be loaded after diamond cut and calculated price are defined. 
7. Since third-party api uses only specific cut to return similar products
   (round, cushion, princess), a decision was made to accept mentioned values as dynamic and in case the value is different -
   the first option (round) is used as a param to fetch similar products.
   Another required values were passed as fallback values (solitaire setting and white gold or platinum metal). 
8. Memory cache is used to save calculated price by default for 15 minutes. (Could be also redis)
9. Basic unit tests were added to test project functionality 
10. Max product length = 4 was added while fetching similar products according to the requirements 
11. Basic request data validations were added for both endpoints

### API endpoints
1. GET `/api/v1/calculate`. Request data format:
````
   cut: string;
   carat: number;
   color: string;
   clarity: string;
   make: string; (optional)
   certificate: string;  (optional)
   useOfflineCalculator: boolean; (optional)
````
2. GET `/get-similar-products`. Request data format:
````
  cut: string;
  budget: string;
````

### Run front-end project
1. Go to front-end directory
`cd ./diamond-analyser-fe`
2. Run `yarn install` to install dependencies 
3. Copy/paste `.env.example` and rename to `.env` in order to have environment variables during project running. Update variables in case of need. 
4. In the project directory, you can run:
`yarn start`

### Run back-end project
1. Go to back-end directory
   `cd ./diamond-analyser-be`
2. Run `yarn install` to install dependencies
3. Copy/paste `.env.example` and rename to `.env` in order to have environment variables during project running. Update variables in case of need.
4. In the project directory, you can run:
   `yarn start`

### Run back-end project tests
1. Go to back-end directory
   `cd ./diamond-analyser-be`
2. Type
```bash
# unit tests
$ yarn run test
```
