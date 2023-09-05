const dbPool = require('../database/database.js');
class IndicatorsModel {
  constructor() {
    this.table = 'human_rights_indicators_responses';
  }
  async getIndicatorsBySessionId(session_id) {
    // return session_id;
    const client = await dbPool.connect();

    const query = String(
      `SELECT * from ${this.table} WHERE session_id = '${session_id}'`
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
  async getIndicatorCount(session_id) {
    const client = await dbPool.connect();
    const query = String(
      `SELECT COUNT(*) from ${this.table} WHERE session_id = '${session_id}'`
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
  async createIndicatorResponse(params) {
    const client = await dbPool.connect();
    let query;

    const testIfExists = await client.query(
      `SELECT id FROM ${this.table} WHERE session_id ='${params.session_id}' AND indicator_id = '${params.indicator_id}'`
    );
    if (testIfExists.rowCount > 0) {
      console.log('look here');
      query = String(`UPDATE human_rights_indicators_responses
            SET ${params.field_name} = '${params.field_value}', date_updated = CURRENT_TIMESTAMP
            WHERE indicator_id = '${params.indicator_id}' AND session_id = '${params.session_id}';

            UPDATE human_rights_projects SET date_updated = CURRENT_TIMESTAMP WHERE session_id = '${params.session_id}'
            
            `);
    } else {
      query = String(
        `INSERT INTO human_rights_indicators_responses (id, date_updated, session_id, indicator_id, ${
          params.field_name
        })
        VALUES (
          ${new Date().valueOf()},
          CURRENT_TIMESTAMP,
          '${params.session_id}',
          '${params.indicator_id}',
          '${params.field_value}'
           );
           UPDATE human_rights_projects SET date_updated = CURRENT_TIMESTAMP WHERE session_id = '${
             params.session_id
           }'
           `
      );
    }

    try {
      const result = await client.query(query);

      return result;
    } catch (error) {
      console.log(error);
      return undefined;
    } finally {
      client.release(); // release the postgres client regardless of the outcome
    }
  }
}

module.exports.IndicatorsModel = IndicatorsModel;
