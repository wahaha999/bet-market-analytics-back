import connection from "../database/database"

export const getTest = async (req, res) => {
  try {
      // const { type, start_date, end_date } = req.query;
      // console.log("type", type);
      // console.log("start_date", start_date);
      // console.log("end_date", end_date);
      const sqlQuery = `WITH TimeRanked AS (
          SELECT
              CASE currency
                  WHEN 'usd' THEN book_risk_component
                  WHEN 'eur' THEN book_risk_component * 1.1
                  WHEN 'ausd' THEN book_risk_component * 0.67
                  WHEN 'cad' THEN book_risk_component * 0.75
                  ELSE  book_risk_component
              END AS transformed_bet,	
              accepted_datetime_utc,
              team_abbr,
              NTILE(100) OVER (PARTITION BY team_abbr ORDER BY accepted_datetime_utc ASC) AS TimeSegment
          FROM output_csv
          WHERE team_abbr IS NOT NULL
          )
          SELECT 
              team_abbr AS team_name,
              MIN(accepted_datetime_utc) AS date_time,
              AVG(transformed_bet) AS average_value
          FROM TimeRanked
          GROUP BY TimeSegment, team_abbr
          ORDER BY team_abbr, date_time
              ;`
      connection.query( sqlQuery, (error, results) => {
            if (error) {
                console.error('Error executing SQL query:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
              }
              // Check if there are rows returned
              if (results && results.length > 0) {
                res.status(200).json({ results });
              } else {
                res.status(404).json({ message: 'No data found' });
              }
        }
      );
    } catch (error) {
        console.error('Controller error:', error);
         res.status(500).json({ error: 'Internal server error' });
    }
}

export const getBetTrend = async (req, res) => {
    try {
        const { type, start_date, end_date } = req.query;
        const sqlQuery = `WITH TimeRanked AS (
            SELECT
                CASE currency
                    WHEN 'usd' THEN book_risk_component
                    WHEN 'eur' THEN book_risk_component * 1.1
                    WHEN 'ausd' THEN book_risk_component * 0.67
                    WHEN 'cad' THEN book_risk_component * 0.75
                    ELSE  book_risk_component
                END AS transformed_bet,	
                accepted_datetime_utc,
                team_abbr,
                NTILE(100) OVER (PARTITION BY team_abbr ORDER BY accepted_datetime_utc ASC) AS TimeSegment
            FROM output_csv
            WHERE team_abbr IS NOT NULL AND bet_type = ? AND accepted_datetime_utc BETWEEN ? AND ?
            )
            SELECT 
                team_abbr AS team_name,
                MIN(accepted_datetime_utc) AS date_time,
                AVG(transformed_bet) AS average_value
            FROM TimeRanked
            GROUP BY TimeSegment, team_abbr
            ORDER BY team_abbr, date_time
                ;`
        connection.query( sqlQuery, [ type, start_date, end_date ], (error, results) => {
              if (error) {
                  console.error('Error executing SQL query:', error);
                  res.status(500).json({ error: 'Internal server error' });
                  return;
                }
                // Check if there are rows returned
                if (results && results.length > 0) {
                  res.status(200).json({ results });
                } else {
                  res.status(404).json({ message: 'No data found' });
                }
          }
        );
      } catch (error) {
          console.error('Controller error:', error);
           res.status(500).json({ error: 'Internal server error' });
      }
}

export const getBetTrendProfit = async (req, res) => {
    try {
        const { type, start_date, end_date } = req.query;

        const sqlQuery = `WITH TimeRanked AS (
            SELECT
                CASE currency
                    WHEN 'usd' THEN book_profit_gross_component
                    WHEN 'eur' THEN book_profit_gross_component * 1.1
                    WHEN 'ausd' THEN book_profit_gross_component * 0.67
                    WHEN 'cad' THEN book_profit_gross_component * 0.75
                    ELSE  book_profit_gross_component
                END AS transformed_bet,	
                accepted_datetime_utc,
                team_abbr,
                NTILE(100) OVER (PARTITION BY team_abbr ORDER BY accepted_datetime_utc ASC) AS TimeSegment
            FROM output_csv
            WHERE team_abbr IS NOT NULL AND bet_type = ? AND accepted_datetime_utc BETWEEN ? AND ?
            )
            SELECT 
                team_abbr AS team_name,
                MIN(accepted_datetime_utc) AS date_time,
                AVG(transformed_bet) AS average_value
            FROM TimeRanked
            GROUP BY TimeSegment, team_abbr
            ORDER BY team_abbr, date_time
                ;`
        connection.query( sqlQuery, [ type, start_date, end_date ], (error, results) => {
              if (error) {
                  console.error('Error executing SQL query:', error);
                  res.status(500).json({ error: 'Internal server error' });
                  return;
                }
                // Check if there are rows returned
                if (results && results.length > 0) {
                  res.status(200).json({ results });
                } else {
                  res.status(404).json({ message: 'No data found' });
                }
          }
        );
      } catch (error) {
          console.error('Controller error:', error);
           res.status(500).json({ error: 'Internal server error' });
      }
}