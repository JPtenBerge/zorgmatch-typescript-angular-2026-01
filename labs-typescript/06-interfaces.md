# Lab 6 - Interfaces

## Case Explanation

Welcome to the greatest bank in the world. The first bank that decided to go all in! The future is bright indeed.

Our mission? TYPE SAFETY. Yes. All the way. We will program our entire code base 100% type safe. No customer will lose their money because of a type error!

Our brilliant bank will be TypedBank™.

![Typed Bank](img/TypedBank-logo-and-slogan.png)

The success of this company depends solely on you. Good luck!

## Preparations

Create the setup you made the previous lab.

In this Lab you are going to create interfaces and improve the code base to make it more type safe.

## Exercise 1: Create an `Iban` interface

1. Create an `Iban` interface. The interface should describe the shape returned by a to create `generateIban` function.
1. Use the interface as the return type of `generateIban`
1. Make sure that there are no compile errors.

Play around with the `Iban` interface. What happens if you add a property to it? What happens when you remove the explicit return type from the `Iban` function? Can you explain what's happening here?

## Exercise 2: Create a `Customer` interface

1. Create an interface for a `Customer`. It should have a `firstName` (string), `lastName` (string) and an `insertion` (string). The `insertion` should be optional.
1. Make sure the `formatName` method accepts this new interface.
1. Test the code to see if it formats a name correctly.

## Exercise 3: Create a `BankAccount` interface

1. Create an interface for a `BankAccount`. It should have a `customer` field (type `Customer`) and a `iban` field (type `Iban`)
1. Add a function `createBankAccount` with the following shape:
   ```ts
   function createBankAccount(customer: Customer): BankAccount {
     // TODO
   }
   ```
   It should create a new `Iban` using `generateIban` and return a new `BankAccount`.
1. Create some bank accounts in an array:
   ```ts
   const bankAccounts = [
     createBankAccount({
       firstName: 'Alfred',
       lastName: 'Kwak',
       insertion: 'Jodocus',
     }),
     createBankAccount({ firstName: 'Brad', lastName: 'Pitt' }),
     createBankAccount({ firstName: 'Jack', lastName: 'Sparrow' }),
   ];
   ```
1. Can you guess what the type of the `bankAccounts` variable is? Verify this by hovering over it in your code editor.

## Exercise 4: If time permits

Add a method `toString` to the bank accounts created with the `createBankAccount` method. Use the `formatName` and `formatIban` functions to display them in the following order:

```
[NL15 TYPE 7608 1718] Alfred Jodocus Kwak
[NL65 TYPE 5016 0769] Brad Pitt
[NL76 TYPE 3727 8486] Jack Sparrow
```

**Hint** You might need to add the `toString` method to the `BankAccount` interface.
