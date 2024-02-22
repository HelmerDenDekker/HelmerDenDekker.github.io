# Input validation

*5-5-2023 - updated 23-6-2023*

## Big picture

![Input validation](/assets/images/inputvalidationnormalization/inputvalidation.svg "Input validation and normalization")

## Definition

By definition (as articulated so well by OWASP):
Input validation is performed to ensure only properly formed data is entering the workflow in an information system,
preventing malformed data from entering or being persisted, mitigating the risk of triggering malfunction of various
downstream components. Input validation should happen at any interface receiving input.

Syntactic validation should enforce correct syntax of structured fields (e.g. SSN, date, currency symbol).

Semantic validation should enforce correctness of their values in the specific business context (e.g. start date is
before end date, price is within expected range).

## Resources

A list of the resources used for this blog.

[OWASP - Input validation cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).