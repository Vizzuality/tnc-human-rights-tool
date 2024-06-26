const deletionWarningEmailTemplate = (projectName: string) => {
  return `<html>
                <head>
                    <style>
                      .email-container {
                        width: 60%;
                        background-color: #F4F4F4;
                        margin: 4% 20% 0 20%;
                        border-radius: 4px;
                        padding-top: 20px;
                        padding-bottom: 20px;
                      }

                      .email-header {
                        border-bottom: 2px solid #16A34A;
                        text-align: center;
                        margin-bottom: 16px;
                      }

                      .email-body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        text-align: left;
                        padding: 0px 30px 0px 30px;
                        font-weight: 700;
                      }

                      @media only screen and (max-width: 1024px) {
                        .email-header {
                          font-size: 10px;
                          padding: 0 20px 0 20px;
                        }
                        .email-body {
                          font-size: 12px;
                        }
                      }
                    </style>
                </head>
               <body>
                    <div class="email-container">
                        <div class="email-header">
                            <h1>Human Rights Screening Tool</h1>
                        </div>
                        <div class="email-body">
                            <p>Dear user,</p>
                            <p>Your project ${projectName} has been deleted as part of the tool's periodic data cleaning to keep the site secure. </p>
                        </div>
                    </div>
                </body>
            </html>`
};

export default deletionWarningEmailTemplate;
