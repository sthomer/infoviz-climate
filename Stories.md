# Stories for the visualization depending on the dataset

## Dataset
### [Berkeley Earth](https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data/version/2) ? 
GlobalLandTemperaturesByCountry.csv : Temperature for every country from 1700 to 2013  
GlobalTemperatures.csv : Min&Max Temperature for Sea/land from 1700 to 2013

### [Gapminder.org](https://www.gapminder.org/data/?fbclid=IwAR0X_u7_UY8mcXPHC1hP2esrgkFCVh6wGexF19ys-anB0EBAcVQl1EiDqzk)
co2_emissions_tonnes_per_person.csv : CO2 emission per tonne per person per country
yearly_co2_emissions_1000_tonnes.csv : CO2 emission by year in 1000 tonnes
sulfur_emissions_per_person_kg.csv : Sulfure emission per personn per tonnes per country
forest_coverage_percent : Forest coverage in %
forest_land_total_area_ha : Forest coverage in ha

## Story 1
### include
Global temp, CO2, forest coverage, (sea level ?)

### Story
Show that we can (or not) correlate the different dataset and their effects on each other.
--> Less forest coverage, means less CO2 absorption, means more CO2 means increasing global temperature (which means higher sea level).  
I have include sulfure emission that could also provide some information. For instance maybe we are only focusing on CO2 emission while sulfure is also increasing, and maybe it's not a big deal ?

### Views
**Maps :**
* can choose between the dataset  
* Choose specific year from the dataset

**Auxiliary View :**  
If nothing selected :
* plot that shows evolution of earth state (temp, CO2 and forest coverage)
* if CO2 emission, plot showing the biggest country with the highest number

Selection :
* show evolution of the country under the dataset selected (or show all the dataset)
* Allows to change timeline

**Important** We want to show the evolution (which should have increased). So we should think of plot that show this increase [example](https://earthobservatory.nasa.gov/blogs/earthmatters/wp-content/uploads/sites/5/2016/09/tempanoms_gis_august2016.gif?fbclid=IwAR0tz1iMnYRRTBYsMDcHajjjNgSgJnbA9LsyQ-glglA33bW7tArPRDTEFVM)

## Story 2

Show the relation/corelation between people who are affected or dead by extreme tempratures with temprature anomalies.

### Goal

The goal is to see if the temprature anomalies are affecting the health of the people or not with time


### Dataset

1. [people affected by drought](https://www.gapminder.org/data/?fbclid=IwAR0X_u7_UY8mcXPHC1hP2esrgkFCVh6wGexF19ys-anB0EBAcVQl1EiDqzk)
2. [people who died from drought](https://www.gapminder.org/data/?fbclid=IwAR0X_u7_UY8mcXPHC1hP2esrgkFCVh6wGexF19ys-anB0EBAcVQl1EiDqzk)
3. [Temprature anomalies](https://www.ncdc.noaa.gov/cag/global/time-series/globe/land/1/3/1880-2019) In this one we might have to group by continents because it isn't flexible to give by countries. ( average the countries by continents then use them)

The time range is going to be from 1970 to 2008

###

### Preliminary visualizations 

1. A map where we could show some big bubbles to represent how many people dead and the continents are colors based on temprature anomaleis (the more red the continent, the more it's hotter and blue for more cold). We could see if the darker the color might give a bigger bubble or not.

2. A time series line chart where we could two lines that being played at the same time progressing from 1970 to 2008 (after normalizing or curating the data so we could show them in them same scale or something) and to see the evolution of the lines if they are related or not. [something like this](https://www.bloomberg.com/graphics/2015-whats-warming-the-world/)

### Variable selection

We could choose the *combination* of People who are affected *and/or* people who are dead from extreme tempratures. This would affect the bubble sizes that show how much people are affected/dead by the extremes temps.

### Auxiallry view

If it is **possible**, we can point the mouse over a country and see the number exactly of the dead/affected people.

### Additional stuff

Maybe we do it in a way that is being played directly with some little tutorial or a small box where we put information on how to look exactly at the data and how someone could interpret it.

