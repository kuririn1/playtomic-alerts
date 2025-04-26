import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';

export class PlaytomicAlertsWorkflow extends WorkflowEntrypoint<Env, void> {
  async run(event: WorkflowEvent<void>, step: WorkflowStep) {
    // Can access bindings on `this.env`

    const output = await step.do('my first step', async () => {
     
    });

    await step.sleep('wait and repeat', '30 seconds');

  }
}