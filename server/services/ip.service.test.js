const ip = require('./ip.service')
jest.mock('os');
const os = require('os');

describe('ip.service', () => {
   describe('getIPAddress method', () => {
    it('should get the smaller 192.* ip address', () => {
        os.networkInterfaces.mockReturnValue([
            [{ address: '192.168.1.2', family: 'IPv4', internal: false }],
            [{ address: '10.10.10.10', family: 'IPv4', internal: false }],
            [{ address: '192.168.1.1', family: 'IPv4', internal: false }],
            [{ address: '172.10.10.10', family: 'IPv4', internal: false }],
        ]);
        
        expect(ip.getIPAddress()).toBe('192.168.1.1');
    });
    it('should get the smaller 10.* ip address', () => {
        os.networkInterfaces.mockReturnValue([
            [{ address: '10.10.10.10', family: 'IPv4', internal: false }],
            [{ address: '10.10.11.10', family: 'IPv4', internal: false }],
            [{ address: '172.10.10.10', family: 'IPv4', internal: false }],
        ]);
        
        expect(ip.getIPAddress()).toBe('10.10.10.10');
    });
    it('should get the smaller 172.* ip address', () => {
        os.networkInterfaces.mockReturnValue([
            [{ address: '172.10.10.11', family: 'IPv4', internal: false }],
            [{ address: '172.10.10.10', family: 'IPv4', internal: false }],
        ]);
        
        expect(ip.getIPAddress()).toBe('172.10.10.10');
    });
   }); 
});