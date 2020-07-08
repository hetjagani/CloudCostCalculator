Role Name
=========

This role creates `count` number of EC2 instances and also generates a keypair and a security group for those instances. 

Requirements
------------

boto

Role Variables
--------------

ins_name: Name of the instances
ins_type: Instance type
ami_id: Image AMI id from which the instance is to be created
ins_region: AWS Region in which resources needs to be created
ins_key_pair: Key Pair name
ins_sec_group: Security Group Name
hostpath: Inventory file path (relative to root ansible dir)
hoststring: String to append to each host in inventory file
count: number of instances to be created