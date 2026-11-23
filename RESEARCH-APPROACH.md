# Our research approach

[Back to Fajrix Research](README.md) · [Research agenda](RESEARCH-AGENDA.md) · [Publication register](RESEARCH-REGISTER.md)

Our standard is straightforward: a reader should be able to identify the question, inspect the basis for a finding, understand the method and recognise what the evidence does not establish. These are publication expectations; their inclusion here does not certify that any unreported experiment has passed them.

## 1. Define the claim and its intended use

Every study should specify its research question, audience, scope, relevant jurisdiction and time period. It should distinguish:

- **Exploratory work:** investigating a question without implying a previously fixed hypothesis.
- **Evaluative work:** testing defined behaviour, comparisons or hypotheses against stated criteria.
- **Conceptual or strategic analysis:** examining models, implications or policy choices where empirical testing may not be appropriate.

The publication should say what decisions its findings may inform and what use would exceed the evidence.

## 2. Establish provenance and an evidence trail

Prefer inspectable original sources when suitable. Record the source owner, title, publication or observation date, access date where material, relevant definitions, version and any access or reuse restrictions.

Keep the following classes distinguishable:

| Evidence class | Meaning |
| --- | --- |
| Observation | Something recorded in a defined source, dataset or experiment |
| Calculation | A derived result with specified inputs, method and units |
| Estimate | An inferred quantity whose uncertainty or assumptions matter |
| Scenario or forecast | A conditional statement about possible outcomes |
| Interpretation | The author's inference or explanation of the evidence |
| Recommendation | A proposed action or judgement, not an observed fact |

A citation is not a substitute for reading the source. Multiple accounts of one underlying dataset should not be mistaken for independent evidence.

## 3. Design evaluations before interpreting results

For empirical or AI evaluations, document the following where relevant:

- Task, success criteria, expected behaviour and consequences of failure.
- Data provenance, permitted use, representative limitations and separation between development and evaluation inputs.
- Baselines, including deterministic rules or existing manual approaches where relevant.
- Runtime and model versions, prompts or configurations that can safely be disclosed, tool permissions and the environment tested.
- Metrics appropriate to the financial task: error type and severity, monetary effect, completeness, consistency, human intervention, cost and latency as applicable.
- Sample size, repetitions, uncertainty, failures, exclusions and counterexamples.

Where a comparison cannot be reproduced, state what readers can independently inspect and why access is restricted. An improvement over a weak or unrepresentative baseline does not establish operational superiority.

## 4. Protect accounting integrity and security boundaries

In financial examples, distinguish an AI suggestion from a verified rule, calculation or authorised posting action. Disclose assumptions about tax, accounting treatment, currency, rounding and jurisdiction. Never imply that a worked example is personalised professional advice or a production-ready accounting control.

Use synthetic or appropriately licensed, de-identified material for public experiments. Do not publish customer records, credentials, internal access paths, sensitive operational configuration or private repository content. Security examples should communicate the assurance method without disclosing exploitable details of deployed systems.

Private engineering work can inform a question without becoming public evidence. Only a separately reviewed and intentionally released artefact can support a public reproducibility claim.

## 5. Compare like with like and disclose uncertainty

Comparisons must account for differences in definition, currency, units, sample, reporting period, population, source quality and attribution. AI investment, AI adoption, technical capability and domestic value capture measure different things.

Show material limitations, alternative explanations, sensitivity to assumptions and conditions under which a conclusion may not hold. Correlation alone does not establish causality. Simulated or synthetic results should not be presented as measured production outcomes.

## 6. Publish an inspectable research companion

The [study-companion template](templates/STUDY-COMPANION.md) is the starting point for each public release. A companion should include, as applicable:

| Type | Expected supporting material |
| --- | --- |
| Quantitative study | Source register, definitions, calculations, assumptions, scripts or a clear reproduction method |
| AI or software evaluation | Protocol, task and input conditions, baseline, versions, scoring, results and failure cases |
| Conceptual framework | Definitions, reasoning, source basis, worked example and boundaries |
| Strategic or policy analysis | Dated primary sources, comparison rules, assumptions, alternatives and uncertainty |

A study should identify the published artefacts, exact version or commit, evidence cutoff, known limitations, review performed and permitted reuse. Inaccessible artefacts should not be represented as independently reproducible.

## 7. Review, correct and maintain a visible status

Studies move through explicitly recorded statuses in the [research register](RESEARCH-REGISTER.md): proposed, in progress, under review, published, superseded or withdrawn. A research programme without a registered study is an **agenda direction**, not research already underway.

Before publication, check factual support, mathematics, links, legal or licensing rights, accessibility, security and any claims of validation. Automated documentation checks are helpful but do not replace subject-matter review. Identify independent review only when an independent reviewer actually assessed the work.

Publish substantive corrections with the original claim, revised claim, reason, date and effect on conclusions. Retain an accessible revision history where possible. Distinguish a study revision from a product release.

## 8. Respect the boundary between research and product assurance

An engineering preview, research result, audited production system and generally available financial product are different maturity levels. Publication is not certification, independent peer review, regulatory approval or assurance of fitness for financial operations unless the specific evidence supports that claim.

The [rights and reuse notice](LICENSE.md) applies to repository material unless an artefact explicitly carries different terms. Contributors should follow [CONTRIBUTING.md](CONTRIBUTING.md) for provenance and disclosure of material AI assistance.
