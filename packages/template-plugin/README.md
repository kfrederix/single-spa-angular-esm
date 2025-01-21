# Template-plugin
Plugin dedicated for this single-spa-angular-esm template

## generators:

# Nx Generator: mife-ng-application 
The mife-ng-application generator is a custom Nx generator designed to create a new Single-Spa Angular application for this monorepo template. 

--- 

## Features
 - Initializes a new Single-Spa Angular application with the specified configuration.
 - Updates import map files (importmap-mf.json and importmap-mf.prod.json) with the application name and its corresponding URL or local path.
  
 --- 
 
 ## Usage 
 ### Command Line To run the generator using the Nx CLI:
  ```bash 
  nx generate @single-spa-angular-esm/template-plugin:mife-ng-application --name=<application-name> --port=<port-number> --directory=<directory>
  ```

   - Replace <application-name> with the desired name of your application.
   - Replace <port-number> with the port to be used for the development server. 
   - Replace <directory> with the path where the application should be created (e.g., apps). 
  
  ### Example: 
  ```bash 
  nx generate @single-spa-angular-esm/template-plugin:mife-ng-application --name=my-app --port=4201 --directory=apps
  ```
  
   --- 