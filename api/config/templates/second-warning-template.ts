const secondWarningEmailTemplate = (projectName: string) => {
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
                             <p>The Human Rights Screening Tool deletes user-entered data every 6 months. This is a notification to let you know that your project ${projectName} data will be deleted in <b>1 day</b>.
                               <br/>
                               <br/>
                             Please download a report of your results in the Follow Up section of the tool. If you have not completed the screening for your project and you want to avoid losing your project data,
                             you can also opt out of this process by emailing humanrights@naturebase.org to let us know you are still working on your screening and need to keep your project data.</p>
                             <p>Sincerely,
                                <br/>
                             The Human Rights Screening Tool Team</p>
                        </div>
                    </div>
                </body>
            </html>`
};

export default secondWarningEmailTemplate;
