const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sample portfolio items
const portfolioItems = [
  {
    id: 1,
    title: "E-Commerce Website",
    description:
      "A fully responsive e-commerce platform built with React and Node.js. Features include user authentication, payment processing, and inventory management.",
    image: "ecommerce-project.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    url: "#",
  },
  {
    id: 2,
    title: "Mobile Fitness App",
    description:
      "A cross-platform fitness application that tracks workouts, nutrition, and progress. Includes social features and personalized workout recommendations.",
    image: "fitness-app.jpg",
    technologies: ["React Native", "Firebase", "GraphQL"],
    url: "#",
  },
  {
    id: 3,
    title: "Corporate Website Redesign",
    description:
      "Complete redesign of a corporate website focusing on improved user experience, accessibility, and modern design principles.",
    image: "corporate-website.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript", "WordPress"],
    url: "#",
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description:
      "Interactive dashboard for visualizing complex datasets. Used by marketing teams to track campaign performance and customer engagement.",
    image: "data-dashboard.jpg",
    technologies: ["D3.js", "Vue.js", "Python", "SQL"],
    url: "#",
  },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "My Portfolio", portfolioItems });
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio", { title: "My Work", portfolioItems });
});

app.get("/portfolio/:id", (req, res) => {
  const item = portfolioItems.find(
    (item) => item.id === parseInt(req.params.id)
  );
  if (!item) {
    return res.status(404).render("error", { message: "Project not found" });
  }
  res.render("project-detail", { title: item.title, project: item });
});

// Start the server
app.listen(port, () => {
  console.log(`Portfolio app listening at http://localhost:${port}`);
});
