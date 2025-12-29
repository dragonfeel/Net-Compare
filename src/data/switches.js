export const switchData = [
    {
        id: 'juniper-ex4400',
        vendor: 'Juniper Mist',
        model: 'EX4400-48F',
        image: 'https://www.juniper.net/content/dam/www/assets/images/us/en/products/switches/ex-series/ex4400/ex4400-front.png/jcr:content/renditions/cq5dam.web.1280.1280.png',
        specs: {
            capacity: '320 Gbps',
            ports: '48 x 10GbE SFP+',
            uplinks: '4 x 100GbE',
            poe: 'N/A',
            layer: 'L3 Advanced'
        },
        badge: 'Campus Core',
        type: 'switch'
    },
    {
        id: 'aruba-cx6300',
        vendor: 'Aruba',
        model: 'CX 6300M',
        image: 'https://www.arubanetworks.com/assets/images/Aruba_CX6300_Front_Center_Shadow_Parent.png',
        specs: {
            capacity: '880 Gbps',
            ports: '48 x SmartRate',
            uplinks: '4 x 50GbE',
            poe: 'Class 6 (60W)',
            layer: 'L3 Dynamic'
        },
        badge: 'Aggregation',
        type: 'switch'
    },
    {
        id: 'cisco-c9300',
        vendor: 'Cisco',
        model: 'Catalyst 9300',
        image: 'https://www.cisco.com/c/dam/en/us/products/switches/catalyst-9300-series-switches/catalyst-9300-48u-front.png',
        specs: {
            capacity: '480 Gbps',
            ports: '48 x 1GbE',
            uplinks: 'Modular',
            poe: 'UPoE+ (90W)',
            layer: 'L3 Access'
        },
        badge: 'DNA Ready',
        type: 'switch'
    },
    {
        id: 'arista-7050',
        vendor: 'Arista',
        model: '7050X3',
        image: 'https://placehold.co/400x200/333/FFF?text=Arista+7050X3',
        specs: {
            capacity: '6.4 Tbps',
            ports: '48 x 25GbE',
            uplinks: '8 x 100GbE',
            poe: 'N/A',
            layer: 'L2/L3 Leaf'
        },
        badge: 'Data Center',
        type: 'switch'
    }
];
