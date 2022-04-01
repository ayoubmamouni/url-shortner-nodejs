const About = {
  //You can write HTML in strings
  title: "About Us",
  subTitle: "",
  description: "",
  aboutDetails: [
    {
      itemTitle: "Created By",
      // in description: make sure to add strings between ` not '
      itemDescription: `This website was created by <b>Ayoub Mamouni</b>`,
    },
    //item end.
    {
      itemTitle: "Technologies",
      // in description: make sure to add strings between ` not '
      itemDescription: `The technologies that I used to build this shit is: 
      <b>HTML</b>, 
      <b>CSS</b>, 
      <b>Javascript</b>, 
      <b>Nodejs</b>, 
      <b>Expressjs</b>, 
      <b>MongoDB</b>, 
      <b>Clipboardjs</b>, 
      <b>QRCodejs</b>, 
      <b>Sweetalert2js</b>`,
    },
    {
      itemTitle: "Site Creator",
      itemDescription: `My name is <b>Ayoub Mamouni</b>, I live in <b>Morocco</b> the best country is the world. <br/>
      I created this website in 2021 and after a while I updated it in 2022, I decided to create this website just to practice my skills at coding..
      <br/>
      Thank you for visiting this website. Hope you like it.
      `,
    },
  ],
};

module.exports = About;
