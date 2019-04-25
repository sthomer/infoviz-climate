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

## Timeline
| Week  | Date  | Task
| ---   | ---   | ---
| 10    | 4/19  | Scope and Planning
|       | 4/20  | Define Functionality
|       | 4/21  | Define Components
| 11    | 4/22  | App Structure
|       | 4/23  | *Due: Division of Labor*
|       | 4/24  | Individual Work
|       | 4/25  | Individual Work
|       | 4/26  | Individual Work
|       | 4/27  | Individual Work
|       | 4/28  | *Due: Minimum Viable Products (MVPs)*
| 12    | 4/29  | Connect Components
|       | 4/30  | Additional Datasets
|       | 5/1   | Connect Datasets
|       | 5/2   | User Experience
|       | 5/3   | Story and Defaults
|       | 5/4   | Styling
|       | 5/5   | *Due: Integration*
| 13    | 5/6   | Debugging
|       | 5/7   | Debugging
|       | 5/8   | Debugging
|       | 5/9   | Debugging
|       | 5/10  | *Due: Complete App*
|       | 5/11  | Report
|       | 5/12  | *Due: Report*
| 14    | 5/13  | **Due: Case Studies**
|       | 5/14  | Video
|       | 5/15  | Video
|       | 5/16  | *Due: Video*
|       | 5/17  | Presentation
|       | 5/18  | Presentation
|       | 5/19  | *Due: Presentation*
| 15    | 5/20  | **Due: Project and Presentation**
|       | 5/21  | **Presentation**
