'use strict';

Entry.Everykit = {
    name: 'everykit',
    url: 'http://everykit.io/',
    imageName: 'everykit.png',
    title: {
        "ko": "에브리킷",
        "en": "Every Kit"
    },
    setZero: function() {
        Entry.hw.sendQueue.readablePorts = [];
        for (var port = 0; port < 20; port++) {
            Entry.hw.sendQueue[port] = 0;
            Entry.hw.sendQueue.readablePorts.push(port);
        }
        Entry.hw.update();
    },
    tempSensorList: function() {
        return [[Lang.Blocks.no_target, 'null']];
    },
    ledModuleList: function() {
        return [[Lang.Blocks.no_target, 'null']];
    },
    monitorTemplate: {
        imgPath: 'hw/everykit.png',
        width: 605,
        height: 434,
        listPorts: {
            '2': {
                name: Lang.Hw.port_en + ' 2 ' + Lang.Hw.port_ko,
                type: 'input',
                pos: { x: 0, y: 0 },
            },
            a5: {
                name: Lang.Hw.port_en + ' A5 ' + Lang.Hw.port_ko,
                type: 'input',
                pos: { x: 0, y: 0 },
            },
        },
        mode: 'both',
    },
};

Entry.Everykit.getBlocks = function() {
    return {
        //region arduino 아두이노
        everykit_temp_value: {
            color: '#00979D',
            fontColor: '#fff',
            template: '[에브리킷] 온도센서 %1번의 온도',
            skeleton: 'basic_string_field',
            statements: [],
            params: [
              {
                  type: 'DropdownDynamic',
                  value: null,
                  fontSize: 11,
                  menuName: Entry.Everykit.tempSensorList,
              },
            ],
            events: {},
            def: {
                params: [],
                type: 'everykit_temp_value',
            },
            class: 'everykit_sensor',
            isNotFor: ['everykit'],
            func: function(sprite, script) {
                var pd = Entry.hw.portData;
                return 10;
            },
            syntax: { js: [], py: ['Everykit.temp_value()'] },
        },
        everykit_set_led_value: {
            color: '#00979D',
            fontColor: '#fff',
            skeleton: 'basic',
            template: '[에브리킷] LED %1번 %2 (으)로 정하기',
            params: [
                {
                    type: 'DropdownDynamic',
                    value: null,
                    fontSize: 11,
                    menuName: Entry.Everykit.ledModuleList,
                },
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.everykit_led_red, 'LED_RED'],
                        [Lang.Blocks.everykit_led_green, 'LED_GREEN'],
                        [Lang.Blocks.everykit_led_red, 'LED_BLUE'],
                    ],
                    fontSize: 11,
                },
            ],
            def: {
                params: [
                    null,
                    'LED_RED',
                ],
                type: 'everykit_set_led_value',
            },
            paramsKeyMap: {
                name: 0,
                property: 1,
                upper: 2,
                bottom: 3,
            },
            class: 'everykit_sensor',
            isNotFor: ['everykit'],
            func: function(sprite, script) {
              //  return script.callReturn();
            },
        },
        everykit_set_smartplug_value: {
            color: '#00979D',
            fontColor: '#fff',
            skeleton: 'basic',
            template: '[에브리킷] 스마트플러그 %1번 %2 (으)로 정하기',
            params: [
                {
                    type: 'DropdownDynamic',
                    value: null,
                    fontSize: 11,
                    menuName: Entry.Everykit.ledModuleList,
                },
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.everykit_smartplug_on, 'SMARTPLUG_ON'],
                        [Lang.Blocks.everykit_smartplug_off, 'SMARTPLUG_OFF'],
                    ],
                    fontSize: 11,
                },
            ],
            def: {
                params: [
                    null,
                    'SMARTPLUG_ON',
                ],
                type: 'everykit_set_smartplug_value',
            },
            paramsKeyMap: {
                name: 0,
                property: 1,
                upper: 2,
                bottom: 3,
            },
            class: 'everykit_sensor',
            isNotFor: ['everykit'],
            func: function(sprite, script) {
              //  return script.callReturn();
            },
        },
        everykit_bluetooth_on_receive: {
            color: '#00979D',
            fontColor: '#fff',
            skeleton: 'basic_event',
            template: '%1 [에브리킷] 블루투스 %2번 으로 데이터 수신되었을 때',
            params: [
                {
                    type: 'Indicator',
                    img: 'block_icon/start_icon_hardware.png',
                    size: 17,
                    position: { x: 0, y: -2 },
                },
                {
                    type: 'DropdownDynamic',
                    value: null,
                    fontSize: 11,
                    menuName: Entry.Everykit.ledModuleList,
                },
            ],
            def: {
                params: [],
                type: 'everykit_bluetooth_on_receive',
            },
            paramsKeyMap: {
                port: 0,
                data: 1
            },
            class: 'everykit_sensor',
            isNotFor: ['everykit'],
            event:"bluetooth_on_receive",
            func: function(sprite, script) {
              //  return script.callReturn();
            },
        },
        everykit_bluetooth_send: {
            color: '#00979D',
            fontColor: '#fff',
            skeleton: 'basic',
            template: '[에브리킷] 블루투스 %1번  %2 보내기',
            params: [
                {
                    type: 'DropdownDynamic',
                    value: null,
                    fontSize: 11,
                    menuName: Entry.Everykit.ledModuleList,
                },
                {
                  type: 'Block',
                  accept: 'string',
                },
            ],
            def: {
                params: [
                    null,
                    {
                        type: 'text',
                        params: ["Hello World"]
                    },
                ],
                type: 'everykit_bluetooth_send',
            },
            paramsKeyMap: {
                name: 0,
                property: 1,
                upper: 2,
                bottom: 3,
            },
            class: 'everykit_sensor',
            isNotFor: ['everykit'],
            func: function(sprite, script) {
              //  return script.callReturn();
            },
        },
        //endregion everykit 에브리킷
    };
};
