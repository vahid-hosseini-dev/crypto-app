const convertData = (data, type) => {
  const convertedData = data[type].map((item) => {
    const date = new Date(item[0]).toLocaleDateString("en-CA");
    return { date, [type]: item[1] };
  });

  return convertedData;
};

export { convertData };
