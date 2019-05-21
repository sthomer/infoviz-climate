# Exploring Climate Change
> Information Visualization Project

## Development Quickstart Installation
* Navigate to the `app` directory and run `npm install` to automatically install dependencies
  * This requires `node` and `npm` to already be installed
* Run `npm start` to start the development server
* Go to `localhost:3000` in your browser to view the app

## Development Guidelines
* When developing your portion, create your own `js` and `jsx` files
* `App.jsx` will link these different modules/visualizations together with imports
* Try not to share state across different modules i.e. yours should be pretty self-contained
* Use the `styled-components` package for styling
  * Put reusable things like headers and layouts in `styles.jsx` but custom styles should remain in same file that they are used.  This will result in some duplicate code, but it's significantly easier to debug.
* Don't use bootstrap rows and cols, but feel free to use the components (e.g. buttons, navs)

## TODOs
> Listing of tasks and features we're working on with associated deadlines
### Steve
* Something

### Fabian
* Something else

### Max
#### DataSets & type formats
* [CO2 emission (CSV, XLSX)](https://www.gapminder.org/data/?fbclid=IwAR0X_u7_UY8mcXPHC1hP2esrgkFCVh6wGexF19ys-anB0EBAcVQl1EiDqzk)  
  * [Example plot - Line Plot](https://www.gapminder.org/tools/#$state$marker$axis_y$which=co2_emissions_tonnes_per_person&spaceRef:null;;;&chart-type=linechart)
  * [Example plot - Circle plot](https://www.gapminder.org/tools/#$state$marker$axis_y$which=co2_emissions_tonnes_per_person&domainMin:null&domainMax:null&zoomedMin:null&zoomedMax:null&scaleType=genericLog&spaceRef:null;;;&chart-type=bubbles)
* Extreme temperature
    * [person affected 1971-2008 (XLS)](https://docs.google.com/spreadsheets/d/1IKD51VpIaK2Dk4hwTURMjsGcmHWq7BudL4vRtlRJ4VM/pub#)
    * [person killed 1971-2008 (XLS)](https://docs.google.com/spreadsheets/d/1LC6WyEXrPWtEjVzhEPUC8Ma1tJg1XEz9eFilS03kggw/pub)
### Abed
* That other thing
