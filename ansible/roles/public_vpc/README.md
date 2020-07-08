Role Name
=========

This role creates the network stack in AWS cloud. It creates a VPC, Subnet attached to it, Internet Gateway and configures the main routing table of the created VPC to attach IGW.

Requirements
------------

boto

Role Variables
--------------

vpc_name: Name of VPC
vpc_cidr: VPC CIDR (eg. 10.20.0.0/16)
vpc_region: VPC Region
subnet_cidr: Subnet CIDR (eg. 10.20.1.0/24)
subnet_name: Name of Subnet 
