import OpenAI from "openai" 
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
export const predictDemand = async (systemContent, userContent) => {
    const params = {
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        {
          role: "user",
          content: `${userContent}`,
        },
      ],
      model: "gpt-3.5-turbo",
    };
  
    const chatCompletion = await openai.chat.completions.create(params);
  
    console.log("completion token usage", chatCompletion.usage.completion_tokens);
    console.log("prompt token usage", chatCompletion.usage.prompt_tokens);
    console.log("total token usage", chatCompletion.usage.total_tokens);
  
    return chatCompletion.choices[0].message.content;
  };
  