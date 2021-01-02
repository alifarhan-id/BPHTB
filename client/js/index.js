Ext.define('SspdModel', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'no_sspd',
            type: 'string'
        },
        {
            name: 'nik',
            type: 'string'
        },
        {
            name: 'nama_wp',
            type: 'string'
        },
        {
            name: 'alamat_wp',
            type: 'string'
        },
        {
            name: 'nop',
            type: 'string'
        },
        {
            name: 'alamat_op',
            type: 'string'
        },
        {
            name: 'luas_tanah',
            type: 'string'
        },
        {
            name: 'luas_bangunan',
            type: 'string'
        },
        {
            name: 'njop_pbb',
            type: 'string'
        }
    ]
});
var sspdStore = Ext.create('Ext.data.Store', {
    proxy: {
        model: 'SspdModel',
        type: 'ajax',
        url: 'http://localhost:3000/api/v1/getsspd',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true,
    autoSync: true,
    pageSize: 10

});

Ext.application({
    name: 'MyApp',
    launch: function () {
        this.mkgrid();
    },
    mkgrid: function () {
        Ext.create('Ext.grid.Panel', {
            title: 'DATA SSPD BPHTB KOTA MATARAM',
            store: sspdStore,
            loadMask: true,
            Width: '100%',
            Height: '100%',
            columns: [{
                    text: 'No',
                    dataIndex: 'id'
                },
                {
                    text: 'No SSPD',
                    dataIndex: 'no_sspd'
                },
                {
                    text: 'NIK',
                    dataIndex: 'nik',
                    flex: 1
                },
                {
                    text: 'NAMA WAJIB PAJAK',
                    dataIndex: 'nama_wp',
                    flex: 1
                },
                {
                    text: 'Alamat Wajib Pajak',
                    dataIndex: 'alamat_wp',
                    flex: 1
                },
                {
                    text: 'NOP',
                    dataIndex: 'nop',
                    flex: 1
                },
                {
                    text: 'Alamat Objek Pajak',
                    dataIndex: 'alamat_op',
                    flex: 1
                },
                {
                    text: 'Luas Tanah',
                    dataIndex: 'luas_tanah',
                    flex: 1
                },
                {
                    text: 'Luas Bangunan',
                    dataIndex: 'luas_bangunan',
                    flex: 1
                },
                {
                    text: 'NJOP PBB',
                    dataIndex: 'njop_pbb',
                    flex: 1
                }
            ],


            tbar: [
                '<b>Pencarian :</b>&nbsp;',
                new Ext.form.TextField({
                    id: 'search_no_sspd',
                    name: 'search_no_sspd',
                    width: 150,
                    emptyText: 'No SSPD',
                    listeners: {
                        'specialkey': function (field, e) {
                            if (e.getKey() === e.ENTER) {
                                v_this.prosesSearch();
                            }
                        }
                    }
                }),
                '-',
                new Ext.form.TextField({
                    id: 'search_tahun_sspd',
                    name: 'search_tahun_sspd',
                    autoCreate: {
                        tag: 'input',
                        type: 'number',
                        maxlength: '4'
                    },
                    width: 80,
                    maskRe: /[0-9]/,
                    emptyText: 'Tahun Sspd',
                    listeners: {
                        'specialkey': function (field, e) {
                            if (e.getKey() === e.ENTER) {
                                v_this.prosesSearch();
                            }
                        }
                    }
                }),
                '-',
                new Ext.form.TextField({
                    name: 'search_nama_wp',
                    id: 'search_nama_wp',
                    hiddenName: 'search_nama_wp',
                    emptyText: ' User ',
                    store: this.store_nama_wp,
                    displayField: 'name',
                    typeAhead: true,
                    selectOnFocus: true,
                    mode: 'local',
                    triggerAction: 'all',
                    forceSelection: true,
                    valueField: 'id',
                    width: 100,
                    minListWidth: 100
                }),
                '-',
                {

                    text: 'Cari',
                    scope: this,
                    handler: function () {
                        this.prosesSearch();
                    }
                },
                '->',
                {

                    text: 'Tambah Data SSPD',
                    scope: this,
                    handler: function () {
                        // this.tambahData()
                        this.tambah()
                    }
                },
                '->',
                {

                    text: 'Reload',
                    scope: this,
                    handler: function () {
                        Ext.getCmp('search_no_sspd').setValue('');
                        Ext.getCmp('search_tahun_sspd').setValue('');
                        Ext.getCmp('search_nama_wp').setValue('');
                    }
                }

            ],
            bbar: new Ext.PagingToolbar({
                store: sspdStore,
                pageSize: 10,
                displayInfo: true,
                displayMsg: 'Menampilkan {0} - {1} dari {2}',
                emptyMsg: 'Tidak ada data data',
                beforePageText: 'Halaman',
                afterPageText: 'dari {0}',
                items: [
                    '-',
                    {
                        scope: this,
                        text: 'EXCEL',
                        tooltip: 'Cetak Excel',
                        handler: function () {
                            this.downloadExcel();
                        }
                    }
                ]
            }),
            renderTo: Ext.getBody(),
            resetSearch: function () {
                // Ext.getCmp('search_no_sspd').setValue('');
                // Ext.getCmp('search_tahun_sspd').setValue('');
                // Ext.getCmp('search_nama_wp').setValue('');
                // this.prosesSearch();
                Ext.Msg.alert('status', 'tesss')
            },

        });
    },

    tambah: function () {
        var wajibPajak = {
            xtype: 'fieldset',
            title: 'informasi wajib pajak',
            flex: 1,
            border: false,
            labelWidth: 150,
            defaultType: 'textfield',
            defaults: {
                width: 400
            },
            items: [{
                fieldLabel: 'Nomor SSPD',
                id: 'no_sspd'
            }, {
                fieldLabel: 'nik',
                id: 'nik'
            }, {
                fieldLabel: 'nama WP',
                id: 'nama_wp'
            }, {
                fieldLabel: 'alamat WP',
                id: 'alamat_wp'
            }]
        }
        var objekPajak = Ext.apply({}, {
            flex: 1,
            labelWidth: 30,
            title: 'informasi wajib pajak',
            defaults: {
                layout: 'column',
                width: 400
            },
            items: [{
                fieldLabel: 'nop',
                id: 'nop'
            }, {
                fieldLabel: 'alamat_op',
                id: 'alamat_op'
            }, {
                fieldLabel: 'luas_tanah',
                id: 'luas_tanah'
            }, {
                fieldLabel: 'luas_bangunan',
                id: 'luas_bangunan'
            }, {
                fieldLabel: 'njop_pbb',
                id: 'njop_pbb'
            }]
        }, wajibPajak);

        var myForm = {
            xtype: 'container',
            layout: 'hbox',
            layoutConfig: {
                align: 'right'
            },
            items: [
                wajibPajak,
                objekPajak
            ],


        };

        var myFormPanel = Ext.create('Ext.form.Panel', {
            renderTo: Ext.getBody(),
            width: 1000,
            title: 'Tambah Data SSPD',
            bodyPadding: '10px',
            id: 'myFormPanel',
            layout: 'vbox',
            layoutConfig: {
                align: 'stretch'
            },
            items: [
                myForm
            ],
            buttons: [{
                text: 'Reset',
                handler: function () {
                    this.up('form').getForm().reset();
                }
            }, {
                text: 'Submit',
                formBind: true, //only enabled once the form is valid
                disabled: true,
                handler: function () {
                    const dataJson = {
                        no_sspd: Ext.getCmp('no_sspd').getValue(),
                        nik: Ext.getCmp('nik').getValue(),
                        nama_wp: Ext.getCmp('nama_wp').getValue(),
                        alamat_wp: Ext.getCmp('alamat_wp').getValue(),
                        nop: Ext.getCmp('nop').getValue(),
                        alamat_op: Ext.getCmp('alamat_op').getValue(),
                        luas_tanah: Ext.getCmp('luas_tanah').getValue(),
                        luas_bangunan: Ext.getCmp('luas_bangunan').getValue(),
                        njop_pbb: Ext.getCmp('njop_pbb').getValue()
                    }
                    Ext.Ajax.request({
                        url: 'http://localhost:3000/api/v1/postsspd',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        // params: {
                        //     dataJson
                        // },
                        jsonData: dataJson,
                        success: function (response) {
                            var msg = Ext.Msg.alert('Status', 'Changes saved successfully.', function (btn) {
                                if (btn === 'ok') {
                                    window.close()
                                }
                            });
                        },
                        fail: function () {
                            Ext.Msg.alert('Status', 'data Gagal ditambahkan');
                        }
                    })


                }
            }],
        });

        var myMask = new Ext.LoadMask(Ext.getBody(), {
            msg: "Please wait..."
        });
        myMask.show();
        var window = Ext.create('Ext.window.Window', {
            animCollapse: false,
            constrainHeader: true,
            layout: 'fit',
            shim: false,
            height: 600,
            width: 1000,
            layout: 'fit',
            modal: true,
            items: myFormPanel
        });
        setTimeout(function () {
            window.show();
            myMask.hide()
        }, 1000)



    }

});