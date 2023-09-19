const dbPool = require('../database/database.js');
class ProjectsModel {
  constructor() {
    this.table = 'human_rights_projects';
  }
  async getProjectsByUserId(user_id) {
    const client = await dbPool.connect();
    const query = String(`
    SELECT
    ${this.table}.*,
       (SELECT COUNT(*) FROM human_rights_indicators_responses WHERE session_id =  ${this.table}.session_id) AS answerCount
          FROM
          ${this.table}
          WHERE
          ${this.table}.user_id = '${user_id}'`);

    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
      return undefined;
    } finally {
      client.release(); // release the postgres client regardless of the outcome
    }
  }

  async getProjectBySessionId(session_id) {
    const client = await dbPool.connect();
    const query = String(`
    SELECT date_updated, contact_name, contact_email, name, description FROM ${this.table} WHERE session_id = '${session_id}'`);
    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
      return undefined;
    } finally {
      client.release(); // release the postgres client regardless of the outcome
    }
  }
  async createProject(params, userId) {
    const client = await dbPool.connect();
    const query = String(`INSERT INTO human_rights_projects VALUES
      (gen_random_uuid(), '01/01/1900', CURRENT_TIMESTAMP, '${params.session_id}', '${params.userId}', 'null', 'null', '${params.user_name}', '${params.email}','${params.name}', '${params.description}' );`);
    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
      return undefined;
    } finally {
      client.release(); // release the postgres client regardless of the outcome
    }
  }
  async updateProject(params, userId) {
    const client = await dbPool.connect();
    const query = String(
      `UPDATE ${this.table} SET date_updated = CURRENT_TIMESTAMP, name = '${params.name}', description = '${params.description}' WHERE user_id = '${params.userId}' AND id = '${params.id}'`
    );
    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
      return undefined;
    } finally {
      client.release(); // release the postgres client regardless of the outcome
    }
  }
  async deleteProject(params) {
    const client = await dbPool.connect();
    const query = String(
      `DELETE from ${this.table} WHERE user_id = '${params.userId}' AND id = '${params.id}'`
    );
    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
      return undefined;
    } finally {
      client.release(); // release the postgres client regardless of the outcome
    }
  }
}

module.exports.ProjectsModel = ProjectsModel;
