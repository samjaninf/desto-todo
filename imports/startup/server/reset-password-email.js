import { Accounts } from 'meteor/accounts-base';


Accounts.emailTemplates.siteName = 'The Daily Specials Board';
Accounts.emailTemplates.from = 'The Daily Specials Board <accounts@tdsboard.com>';

Accounts.emailTemplates.resetPassword = {
  subject() {
    return 'Reset your password on The Daily Specials Board';
  },
  text(user, url) {
    return `Hello ${user}

Click the link below to reset your password on The Daily Specials Board.

${url}

If you did not request this email, please look into changing your 
password or just ignore it.

Thanks,
The Daily Specials Board team.
`;
  },
//   html(user, url) {
//     return `
//       XXX Generating HTML emails that work across different email clients is a very complicated
//       business that we're not going to solve in this particular example app.
//
//       A good starting point for making an HTML email could be this responsive email boilerplate:
//       https://github.com/leemunroe/responsive-html-email-template
//
//       Note that not all email clients support CSS, so you might need to use a tool to inline
//       all of your CSS into style attributes on the individual elements.
// `
//   }
};
