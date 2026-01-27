# Lab 8 - Generics

## Preparations

In this lab, we'll implement an audit log function.

## Exercise 1 - Create an `auditLog` function

1. Make sure both `Iban` and `Customer` have a `format` method. It should be without parameters and return a string.
1. Inside the main.ts file, add an `auditLog` function. It should take an argument called "subject" of type `Iban` and an argument called "action" of type string.
1. Inside the `auditLog` function, log the message in this form "[subject]: action". Log it to console for now (we'll have to implement an actual audit log later on). Make sure you call the `format` method on `subject` when you're logging it.
1. Call the `auditLog` function from inside the `BankAccount` constructor (just after you've created the `Iban`).
   ```ts
   auditLog(this.iban, 'created');
   ```
1. Now also use the `auditLog` function to log when a customer is assigned to a bank account. Add `auditLog(customer, 'assigned');` to the `createAccount` method of the `Bank` class. To make it work, make the `auditLog` function generic. Change the type of `subject` to be of generic type `T`. **Hint:** You might need a type constraint to make this work.
