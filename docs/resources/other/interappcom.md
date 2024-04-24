# Inter-application communication

*5-4-2024*

Status: Work in progress  
Type of post:{Guide} {Resource}

## *Rapid fire thoughts*

A bit of a how-to and a bit of a resource.
Just my quick thoughts on the subject

## *Outline*

Questions to answer:
- Can you trust the server where the data is coming from?
- Risk/Sensitivity of the data?



Make a flow diagram in excalidraw:

Trust?
Yes ->
Low risk and sensitivity -> API keys or shared secrets
Medium risk and sensitivity -> mTLS  and ACLS (Access Control Lists)

No ->
High risk and sensitivity -> Authentication, authorization, and monitoring (!!!)


## Resources

Based on my experience in different companies.