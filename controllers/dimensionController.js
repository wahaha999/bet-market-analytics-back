import connection from "../database/database"

export const getClientPlayerBet = async (req, res) => {
  try {
    connection.query(
      `WITH TotalSum AS (
          SELECT SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS total_sum
          FROM output_csv
      )
      
      SELECT	client_name,
              player_name,
          SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS client_player_sum,
          (SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
          END) / (SELECT total_sum FROM TotalSum)) * 100 AS percent
      FROM output_csv
      WHERE player_name is not NULL
      GROUP BY client_name, player_name
      ORDER BY client_name, client_player_sum DESC`, (error, results) => {
          if (error) {
              console.error('Error executing SQL query:', error);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }

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
};

export const getCountryTrend = async (req, res) => {
    try {
      connection.query(
        `WITH TotalSum AS (
            SELECT SUM(CASE currency
                WHEN 'usd' THEN book_risk_component
                WHEN 'eur' THEN book_risk_component * 1.1
                WHEN 'ausd' THEN book_risk_component * 0.67
                WHEN 'cad' THEN book_risk_component * 0.75
                ELSE  book_risk_component
                END) AS total_sum
            FROM output_csv
            WHERE country IS NOT NULL
        )
        
        SELECT	country,
            SUM(CASE currency
                WHEN 'usd' THEN book_risk_component
                WHEN 'eur' THEN book_risk_component * 1.1
                WHEN 'ausd' THEN book_risk_component * 0.67
                WHEN 'cad' THEN book_risk_component * 0.75
                ELSE  book_risk_component
                END) AS country_sum,
            (SUM(CASE currency
                WHEN 'usd' THEN book_risk_component
                WHEN 'eur' THEN book_risk_component * 1.1
                WHEN 'ausd' THEN book_risk_component * 0.67
                WHEN 'cad' THEN book_risk_component * 0.75
                ELSE  book_risk_component
            END) / (SELECT total_sum FROM TotalSum)) * 100 AS percent
        FROM output_csv
        WHERE country IS NOT NULL
        GROUP BY country
        ORDER BY country_sum DESC
        LIMIT 7`, (error, results) => {
            if (error) {
                console.error('Error executing SQL query:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
              }
              // Check if there are rows returned
              if (results && results.length > 0) {
                const other_percent = results.reduce((sum, item) => { return sum - item.percent }, 100)
                const other_sum = results[0].country_sum * other_percent / results[0].percent;
                results.push({ "country": "other", "country_sum": other_sum, "percent": other_percent })
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
};

export const getCurrencyTrend = async (req, res) => {
  try {
    connection.query(
      `WITH TotalSum AS (
          SELECT SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS total_sum
          FROM output_csv
      )
      
      SELECT	currency,
          SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS currency_sum,
          (SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
          END) / (SELECT total_sum FROM TotalSum)) * 100 AS percent
      FROM output_csv
      GROUP BY currency
      ORDER BY currency_sum DESC`, (error, results) => {
          if (error) {
              console.error('Error executing SQL query:', error);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }

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
};

export const getClientTrend = async (req, res) => {
  try {
    connection.query(
      `WITH TotalSum AS (
          SELECT SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS total_sum
          FROM output_csv
      )
      
      SELECT	client_name,
          SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS client_sum,
          (SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
          END) / (SELECT total_sum FROM TotalSum)) * 100 AS percent
      FROM output_csv
      GROUP BY client_name
      ORDER BY client_sum DESC`, (error, results) => {
          if (error) {
              console.error('Error executing SQL query:', error);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }

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
};

export const getStatTypeTrend = async (req, res) => {
  try {
    connection.query(
      `WITH TotalSum AS (
          SELECT SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS total_sum
          FROM output_csv
      )
      
      SELECT	stat_type,
          SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS stat_sum,
          (SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
          END) / (SELECT total_sum FROM TotalSum)) * 100 AS percent
      FROM output_csv
      GROUP BY stat_type
      ORDER BY stat_sum DESC`, (error, results) => {
          if (error) {
              console.error('Error executing SQL query:', error);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }
      
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
};

export const getGameTypeTrend = async (req, res) => {
  try {
    connection.query(
      `WITH TotalSum AS (
          SELECT SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS total_sum
          FROM output_csv
      )
      
      SELECT	gamestate,
          SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS game_sum,
          (SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
          END) / (SELECT total_sum FROM TotalSum)) * 100 AS percent
      FROM output_csv
      GROUP BY gamestate
      ORDER BY game_sum DESC`, (error, results) => {
          if (error) {
              console.error('Error executing SQL query:', error);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }
      
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
};

export const getPlayerTrend = async (req, res) => {
  try {
    connection.query(
      `WITH TotalSum AS (
          SELECT SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS total_sum
          FROM output_csv
      )
      
      SELECT	player_name,
          SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
              END) AS player_sum,
          (SUM(CASE currency
              WHEN 'usd' THEN book_risk_component
              WHEN 'eur' THEN book_risk_component * 1.1
              WHEN 'ausd' THEN book_risk_component * 0.67
              WHEN 'cad' THEN book_risk_component * 0.75
              ELSE  book_risk_component
          END) / (SELECT total_sum FROM TotalSum)) * 100 AS percent
      FROM output_csv
      GROUP BY player_name
      ORDER BY player_sum DESC`, (error, results) => {
          if (error) {
              console.error('Error executing SQL query:', error);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }

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
};