1. Page Object Class Creation
- "Generate a Page Object class for the Login page with methods for entering username, entering password, and clicking the login button."
- "Create a Page Object for the Shopping Cart page that includes methods to add an item, remove an item, and get the total price."
2. Reusable Actions
- "Write a Page Object method that waits until a specific element is visible before interacting with it."
- "Add a utility method in the Page Object to verify if a button is enabled or disabled."
3. Test Case Scenarios Using POM
- "Using the LoginPage object, write a test that verifies a user can log in successfully with valid credentials."
- "Build a test that uses the ProductPage object to search for a product, add it to the cart, and confirm it appears in the CartPage."
4. Cross-Page Navigation
- "Create a test that starts from the HomePage object, navigates to the ProfilePage, and verifies the user’s name is displayed correctly."
- "Write a test that uses the CheckoutPage object to complete a purchase and then verifies the confirmation message on the ConfirmationPage."
5. Error Handling & Validation
- "Add a method in the LoginPage object to capture error messages when login fails."
- "Write a test using the RegistrationPage object that verifies error messages appear when mandatory fields are left blank."
6. Parameterized Tests
- "Generate a test that uses the SearchPage object to search for multiple products (provided as test data) and verify results are displayed."
- "Write a test that logs in with different user roles using the LoginPage object and verifies role-specific dashboards."
- "Store test datas in json files, increasing it reusability and the need to maintain it.
