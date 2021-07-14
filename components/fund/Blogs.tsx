type BlogType = {
  title: string;
  description: string;
  image: string;
};

const blogs: BlogType[] = [
  {
    title: "Can a 529 Plan Pay for Private Elementary School",
    description:
      "529 plans offer many benefits, leaving some to wonder if they can use these funds for other forms of education.",
    image:
      "https://sootchy-assets.s3.us-east-2.amazonaws.com/gifting-website/Rectangle-210.png",
  },
  {
    title: "What is the Best Financial Gift for a Child?",
    description:
      "There are many ways you can contribute to a child's future financial success, but what will help them the most?",
    image:
      "https://sootchy-assets.s3.us-east-2.amazonaws.com/gifting-website/Rectangle-211.png",
  },
  {
    title: "How Much Money Do You Need to Start a 529 Plan?",
    description:
      "Many people ask us 'how much do you need to start a 529 plan?' The answer varies based on your location.",
    image:
      "https://sootchy-assets.s3.us-east-2.amazonaws.com/gifting-website/Rectangle-212.png",
  },
];

const Blogs = () => {
  return (
    <div className="blogs__div container">
      <h1>Helpful Resources</h1>
      <p>
        Whether you want to know more about the impact of your gift or need to{" "}
        <br />
        determine whether your contribution is tax-deductible, we’ve got your
        back!
      </p>
      <div className="blogs">
        {blogs.map((blog: BlogType) => (
          <div key={blog.title}>
            <img src={blog.image} />
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
