const RecursiveDisplay = ({ data, spec = {} }) => {
  const isList = Array.isArray(data);

  const getSortedKeys = () => {
    if (isList) return [];

    const keys = Object.keys(data);
    if (!spec || Object.keys(spec).length === 0) {
      return keys;
    }

    return keys.sort((a, b) => {
      const orderA = spec[a]?.order ?? 9999;
      const orderB = spec[b]?.order ?? 9999;
      return orderA - orderB;
    });
  };

  const getLabel = (key) => {
    if (spec && spec[key] && spec[key].label) {
      return spec[key].label;
    }
    return key;
  };

  const getChildSpec = (key) => {
    if (spec && spec[key]) {
      return spec[key];
    }
    return {};
  };

  const sortedKeys = getSortedKeys();

  if (isList) {
    // If it's a list with 'list' spec, render as simple list
    if ('list' in spec && spec.list) {
      return (
        <ul className="list-unstyled detalle-it">
          {data.map((item, index) => (
            <li key={index} className="mb-2">
              {item && typeof item === 'object' ? (
                <div className="ms-3 border-start ps-2">
                  <RecursiveDisplay data={item} spec={spec} />
                </div>
              ) : (
                <span>{item}</span>
              )}
            </li>
          ))}
        </ul>
      );
    }

    // Otherwise render as table
    return (
      <table className="table table-sm table-bordered table-striped">
        {data.length > 0 && (
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.entries(item).map(([key, value]) => (
                <td key={key}>
                  {typeof value === 'object' ? (
                    <RecursiveDisplay data={item[key]} spec={spec} />
                  ) : (
                    <span>{value}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // For objects
  return (
    <ul className="list-unstyled detalle-it">
      {sortedKeys.map((key) => (
        <li key={key} className="mb-1 li-ot">
          <strong>{getLabel(key)}:</strong>
          {data[key] && typeof data[key] === 'object' ? (
            <div className="ms-3 border-start ps-2">
              {!Array.isArray(data[key]) &&
              'list' in getChildSpec(key) &&
              !getChildSpec(key).list ? (
                <table className="table table-sm table-bordered table-striped">
                  <thead>
                    <tr>
                      {Object.keys(data[key]).map((k) => (
                        <th key={k}>{getLabel(k)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(data[key]).map(([k, value]) => (
                        <td key={k}>
                          <span>{value}</span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              ) : (
                <RecursiveDisplay data={data[key]} spec={getChildSpec(key)} />
              )}
            </div>
          ) : (
            <span>{data[key]}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RecursiveDisplay;
