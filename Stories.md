# Stories for the visualization depending on the dataset

## Dataset
### Origin ? (abde)
GlobalLandTemperaturesByCountry.csv : Temperature for every country from 1700 to 2013
GlobalTemperatures : Min&Max Temperature for Sea/land from 1700 to 2013

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
Show that we can (or not) corelate the different dataset and that they are effects on each other.
--> Less forest coverage, means less CO2 absorption, means more CO2 means increasing global tmperature (which means higher sea level).  
I have include suflure emission that could also provide some information. For instance maybe we are only focusing on CO2 emission while sulfure is also increasing, and maybe it's not a big deal ?

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
