import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { onboardingAssistant } from './agents/onboarding-assistant';

export const mastra = new Mastra({
  agents: { 'onboarding-assistant': onboardingAssistant },
  logger: new PinoLogger({ 
    name: 'Onboarding-AI-Assistant', 
    level: 'info' 
  }),
});