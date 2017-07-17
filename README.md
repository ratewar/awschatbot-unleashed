[Build Status](https://travis-ci.org/ratewar/awschatbot-unleashed.svg?branch=master)

## Pre-requisites

1. Node.js `v4.3.0` or later. [Download](https://nodejs.org/en/download/)
2. Serverless CLI `v1.9.0` or later. You can run `npm install -g serverless` to install it once node is installed
3. An AWS account. If you don't already have one, you can sign up for a [free trial](https://aws.amazon.com/s/dm/optimization/server-side-test/free-tier/free_np/) that includes 1 million free Lambda requests per month.
4. **Set-up your Credentials**[AWS Docs](http://docs.aws.amazon.com/cli/latest/userguide/installing.html).
[Watch the video on setting up credentials Serverless](https://www.youtube.com/watch?v=HSd9uYj2LJA)

## How to Setup Project

```bash
# Install node modules
# Change into the newly created directory
$ cd projectdir
$ npm install
$ sls deploy
```
## Other Sub projects to manage images upload for the marketplace

1. S3 Image Upload : A website is available seperately to upload images into S3, please refer README.MD uploadimages folder

## Architecture

![TheBot](https://github.com/vikasbguru/awschatbot-unleashed/blob/master/architecture/arch.png)
