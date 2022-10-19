const responseSender = async (req, res) => {
  const { success = true, response } = req;
  const formattedResponse = {
    success,
    data: response,
  };
  res.json(formattedResponse);
};

module.exports = [responseSender];
