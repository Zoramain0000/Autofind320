  // api/scan.js - Deploy to Vercel as serverless function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { bounds } = req.body; // [south, west, north, east]
  
  // Simulate real reconnaissance APIs (ipinfo.io, bgp.he.net, etc.)
  const targets = [];
  
  for (let i = 0; i < 8 + Math.floor(Math.random() * 8); i++) {
    const lat = bounds[0] + Math.random() * (bounds[2] - bounds[0]);
    const lng = bounds[1] + Math.random() * (bounds[3] - bounds[1]);
    
    targets.push({
      ip: `198.51.${Math.floor(Math.random()*256)}.${Math.floor(100+Math.random()*155)}`,
      lat: lat.toFixed(6),
      lng: lng.toFixed(6),
      ports: getLivePorts(),
      device: getDeviceFingerprint(),
      social: Math.random() > 0.75 ? [`https://twitter.com/target${i}`, `https://linkedin.com/in/target${i}`] : [],
      post_content: getPostData()
    });
  }

  res.status(200).json(targets);
}

function getLivePorts() {
  const services = [
    '80/HTTP', '443/HTTPS', '22/SSH', '8080/HTTP-ALT', '8443/HTTPS-ALT',
    '21/FTP', '3389/RDP', '1433/MSSQL', '3306/MySQL', '5432/PostgreSQL'
  ];
  return services.sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random()*3));
}

function getDeviceFingerprint() {
  const devices = [
    'Ubuntu 22.04 Server', 'Windows Server 2019', 'CentOS 8', 'IoT Camera',
    'MikroTik RouterOS', 'Docker Container', 'NAS Synology', 'Android Device'
  ];
  return devices[Math.floor(Math.random() * devices.length)];
}

function getPostData() {
  const posts = [
    'POST /login HTTP/1.1\r\nHost: target.com\r\nContent-Type: application/json',
    'GET /api/v1/users HTTP/1.1\r\nAuthorization: Bearer xxx',
    'POST /upload HTTP/1.1\r\nContent-Type: multipart/form-data'
  ];
  return posts[Math.floor(Math.random() * posts.length)];
}
