const { OpenAI } = require('openai');
const Course = require('../models/Course');

const openai = new OpenAI({ apiKey: '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' });

let requestCount = 0;

const getCourseRecommendations = async (req, res) => {
  if (requestCount >= 250) return res.status(429).json({ message: 'API request limit reached' });

  const { prompt } = req.body;
  const courses = await Course.find({}).select('title description');

  const courseList = courses.map(c => `${c.title}: ${c.description}`).join('\n');

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a course recommendation assistant. Recommend courses from the list based on the user\'s goal.' },
        { role: 'user', content: `Available courses:\n${courseList}\n\nUser prompt: ${prompt}\nRecommend a list of course titles.` }
      ],
    });
    requestCount++;
    res.json({ recommendations: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: 'Error with GPT API', error });
  }
};

module.exports = { getCourseRecommendations };