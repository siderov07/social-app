#### Styling

Using SCSS with BEM and OOCSS,
Building reusable styles which can be used in diffrent layouts (consider using percents instead pixеls for width and using also 'width' with combination with 'max-width' props

Global styles like styles for buttons, forms etc. are located in the app/styles directory 
and sub-directory's , other individual styles like styles for card for example Movie/Book Card must be written in the component styling file.

Write easy extendable classes, for example - instead writing a single class for button 'button-primary' and another 'button-disabled' consider doing a base class button and add addition class for color, size, etc.

#### Architecture

Every module folder structure must look like components/pages/entities/services etc.
(its possible components in the component folder to be separated in smart/dumb components in future)

All pipes, shared functionality etc. must be in the Share Module

Core functionality like Authentication, Navigation, Services which is supposed to be singleton must be located in Core Module.

**IMPORTANT !** Do not import Core Module in other modules, must be imported only once in the App Module, otherwise its possible to get dublicated DI services.

Consider writing code with more 'reactive' approach and less 'imperative'
Example: Use RXJS operators for transforming, filtering, etc. the data and use '| async' pipe to delegate the un/subscribing to the framework.

Try to avoid heavy business logic in the HTML, its HT'Markup'L language, move the logic to the TypeScrip file.

Page components should not have a selector as they are only loaded via a route

#### Other

Please use enums for constants. Example:

enum AppRoutes {
    Home = 'home'
}

