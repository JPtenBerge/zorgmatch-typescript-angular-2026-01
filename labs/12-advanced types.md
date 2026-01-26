# Lab 12 - Advanced types

If you couldn't finish the previous exercise, you can copy and paste the previous solution from the _lab-solutions_ directory.

**Note:** Make sure that typescript compiler is running in watch mode (`npx tsc -b -w`).

## Exercise 1 - Support for languages

1. Add a property called `language` in `BankConfig`. Make sure the only correct values are `'nl'`, `'en'` and `'fr'`.
1. In the `createAccount` method of `Bank`, change the `console.log` statement. Based on the `language` setting, it should either say
   - '_[bank]_ verwelkomt _[customer]_' (for `'nl'`)
   - '_[bank]_ welcomes _[customer]_' (for `'en'`)
   - '_[bank]_ accueille _[customer]_ (for `'fr'`)

Make sure your code compiles and runs.

## Exercise 2 - Type guard for new customers

In the `BankServer` class. Review the `HTTP POST` express `POST` handler for `/api/customers`. If you didn't get the chance to finish it, copy that part from the lab-solutions of lab 11.

Make sure the `request.body` is an actual _valid_ customer. Implement the validation method called `isValid` using a type guard. Be sure to type the HTTP POST payload as `unknown`, in order to see that the type guard works. You can use this code snippet to call the `isValid` method:

```ts
const maybeCustomer: unknown = request.body;
if (this.isValid(maybeCustomer)) {
  this.bank.createAccount(
    new Customer(
      maybeCustomer.firstName,
      maybeCustomer.lastName,
      maybeCustomer.insertion,
    ),
  );
  response.status(204);
  response.end();
} else {
  response.status(422);
  response.end('Customer entity invalid');
}
```

Make sure your code compiles and runs. Try it out using the following cURL command. You can also use a tool like Postman or an HttpRequester browser plugin.

```shell
$ curl -H 'Content-Type: application/json' -d '{ "firstName": "James", "lastName": "Bond" }' \
http://localhost:8080/api/customers
```
