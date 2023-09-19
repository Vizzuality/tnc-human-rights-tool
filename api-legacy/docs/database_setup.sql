CREATE TABLE human_rights_users (
    id UUID PRIMARY KEY,
    date_created TIMESTAMP,
    date_updated TIMESTAMP
);

CREATE TABLE human_rights_projects (
    id UUID PRIMARY KEY,
    date_created TIMESTAMP,
    date_updated TIMESTAMP,
    session_id TEXT, -- Create nanoid in Vue
    user_id TEXT,
    source TEXT, -- naturebase or standalone
    mode TEXT, -- full or lite
    contact_name TEXT,
    contact_email TEXT,
    name TEXT,
    description TEXT
);

CREATE TABLE human_rights_research_responses (
    id UUID PRIMARY KEY,
    session_id TEXT,
    date_created TIMESTAMP,
    date_updated TIMESTAMP,
    research_question_id TEXT,
    research_question_selection JSON, -- Maybe JSON instead. Could be No, Yes, or Multi-selection depending on question. Or not applicable if general text box Qs.
    research_question_notes TEXT
);

CREATE TABLE human_rights_indicators_responses (
    id bigint PRIMARY KEY,
    session_id TEXT PRIMARY KEY,
    date_created TIMESTAMP,
    date_updated TIMESTAMP,
    indicator_id TEXT,
    contextual_risk TEXT, -- No, Yes, More research
    contextual_risk_notes TEXT, -- Text box
    project_risk_characterization TEXT, -- Probable project risk, Not applicable, Unlikely, Redressable, Mitigation already in place or available, No project risk
    project_risk_determination TEXT, -- Escalate, Priority, Watch might be called project_naurmal_determination in Vue state
    project_risk_notes TEXT,
    project_enagement_notes TEXT,
    project_risk_determination_notes TEXT, -- maybe make _notes instead of _factors for parity? 
    follow_up_plan_notes TEXT
);

-- Sample POST
UPDATE human_rights_indicators_responses
SET contextual_risk = 'No'
WHERE session_id = 'jsdfjsdfjsdfksdf' AND indicator_id = '1';

