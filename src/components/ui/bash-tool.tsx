import { Terminal, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "./button";
import { links } from "@/lib/content";

// The supplied terminal's header / prompt / output / footer structure,
// repurposed as the landing page's final sign-up invitation.
export function BashTool() {
  return (
    <div className="bash-tool signup-terminal">
      <div className="bash-heading">
        <span>
          <Terminal size={18} /> header / getting started
        </span>
        <span className="terminal-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="bash-body">
        <p className="terminal-comment"># Your next good idea starts here.</p>
        <div className="terminal-command">
          <span aria-hidden="true">$</span>
          <h2 id="terminal-signup-title">Make room for what matters.</h2>
        </div>
        <div className="terminal-output">
          <p>
            <span aria-hidden="true">→</span> Bring the sources you trust.
          </p>
          <p>
            <span aria-hidden="true">→</span> Tell Header what you care about.
          </p>
          <p>
            <span aria-hidden="true">→</span> Get a newsletter made for you.
          </p>
        </div>
        <div className="terminal-prompt" aria-hidden="true">
          <span>$</span>
          <i />
        </div>
      </div>
      <div className="bash-footer">
        <div className="terminal-signup-actions">
          <Button asChild>
            <a href={links.signup}>
              Create your free account <ArrowRight size={18} />
            </a>
          </Button>
          <a className="terminal-login" href={links.login}>
            Already a member?{" "}
            <span>
              Log in <ArrowUpRight size={14} />
            </span>
          </a>
        </div>
        <p className="terminal-trial">
          15-day free trial. No credit card required. $10/mo after.
        </p>
      </div>
      <a className="terminal-docs" href={links.docs}>
        Building with an agent? Read the docs <ArrowUpRight size={14} />
      </a>
    </div>
  );
}
